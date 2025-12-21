// src/hooks/usePhantomScroll.js
import { useEffect } from 'react';

export const usePhantomScroll = (ref) => {
  useEffect(() => {
    const scrollContainer = ref.current;
    if (!scrollContainer) return;

    let isDragging = false;
    let startX;
    let scrollLeft;
    let animationFrame;
    let velocity = 0;
    let lastX;
    let lastTime;
    let dragStartTime = 0;
    let isClick = true;
    const deceleration = 0.88;
    const friction = 0.92;
    const SNAP_DURATION = 450;
    const MIN_VELOCITY = 0.2;

    // Отменяем все анимации
    const cancelScroll = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      velocity = 0;
    };

    // Ультра-плавный скролл с улучшенной easing функцией
    const smoothScrollTo = (target, duration = 500) => {
      const start = scrollContainer.scrollLeft;
      const change = target - start;
      const startTime = performance.now();
      
      cancelScroll();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Кубическая easing функция для максимальной плавности
        const ease = progress < 0.5 
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        scrollContainer.scrollLeft = start + change * ease;
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          animationFrame = null;
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
    };

    // Плавный snap к ближайшей карточке
    const snapToNearestCard = () => {
      const cards = scrollContainer.querySelectorAll('.courseCard');
      if (cards.length === 0) return;

      const containerCenter = scrollContainer.scrollLeft + scrollContainer.clientWidth / 2;
      let nearestCard = null;
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2 - scrollContainer.getBoundingClientRect().left + scrollContainer.scrollLeft;
        const distance = Math.abs(containerCenter - cardCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          nearestCard = card;
        }
      });

      if (nearestCard) {
        const cardRect = nearestCard.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const gap = 28; // Расстояние между карточками
        const targetScroll = cardRect.left - scrollContainer.getBoundingClientRect().left + scrollContainer.scrollLeft - (scrollContainer.clientWidth - cardWidth) / 2 + gap;
        
        smoothScrollTo(targetScroll, SNAP_DURATION);
      }
    };

    // Inertia/momentum скролл
    const applyMomentum = () => {
      if (Math.abs(velocity) > MIN_VELOCITY) {
        scrollContainer.scrollLeft += velocity;
        velocity *= friction;
        animationFrame = requestAnimationFrame(applyMomentum);
      } else {
        velocity = 0;
        snapToNearestCard();
      }
    };

    const handleMouseDown = (e) => {
      dragStartTime = performance.now();
      startX = e.pageX;
      scrollLeft = scrollContainer.scrollLeft;
      lastX = e.pageX;
      lastTime = performance.now();
      isClick = true;
      velocity = 0;
      
      e.preventDefault();
      e.stopPropagation();
      
      scrollContainer.style.scrollSnapType = 'none';
      scrollContainer.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      
      cancelScroll();
    };

    const handleMouseMove = (e) => {
      if (!startX) return;
      
      const currentX = e.pageX;
      const walk = Math.abs(currentX - startX);
      
      if (walk > 3) {
        isDragging = true;
        isClick = false;
      }
      
      if (isDragging) {
        const deltaX = (currentX - startX) * 2.8; // Увеличил множитель для лучшего отклика
        scrollContainer.scrollLeft = scrollLeft - deltaX;
        
        // Рассчитываем velocity для плавной инерции
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime > 0) {
          velocity = (currentX - lastX) * 35 / deltaTime;
          lastX = currentX;
          lastTime = currentTime;
        }
        
        e.preventDefault();
      }
    };

    const handleMouseUp = (e) => {
      if (!startX) return;
      
      const dragDuration = performance.now() - dragStartTime;
      const endX = e.pageX;
      const totalWalk = Math.abs(endX - startX);
      
      // Восстанавливаем стили
      scrollContainer.style.scrollSnapType = '';
      scrollContainer.style.cursor = 'grab';
      document.body.style.userSelect = '';
      
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        
        if (Math.abs(velocity) > 0.5) {
          animationFrame = requestAnimationFrame(applyMomentum);
        } else {
          snapToNearestCard();
        }
      } else if (isClick && dragDuration < 220 && totalWalk < 5) {
        const link = e.target.closest('a');
        if (link && link.href) {
          setTimeout(() => {
            window.location.href = link.href;
          }, 50);
        }
      }
      
      isDragging = false;
      startX = null;
      scrollLeft = null;
      lastX = null;
      lastTime = null;
      dragStartTime = 0;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        handleMouseDown({
          pageX: e.touches[0].pageX,
          clientX: e.touches[0].clientX,
          preventDefault: () => e.preventDefault(),
          stopPropagation: () => e.stopPropagation()
        });
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1 && startX) {
        handleMouseMove({
          pageX: e.touches[0].pageX,
          preventDefault: () => e.preventDefault(),
          stopPropagation: () => e.stopPropagation()
        });
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e) => {
      if (startX) {
        handleMouseUp({
          pageX: e.changedTouches[0].pageX,
          target: e.target,
          preventDefault: () => e.preventDefault(),
          stopPropagation: () => e.stopPropagation()
        });
      }
    };

    scrollContainer.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
    
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    scrollContainer.addEventListener('touchend', handleTouchEnd);
    scrollContainer.addEventListener('touchcancel', handleMouseUp);

    // Инициализация
    scrollContainer.style.cursor = 'grab';
    scrollContainer.style.scrollBehavior = 'auto';

    return () => {
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
      
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      scrollContainer.removeEventListener('touchcancel', handleMouseUp);
      
      cancelScroll();
    };
  }, [ref]);
};