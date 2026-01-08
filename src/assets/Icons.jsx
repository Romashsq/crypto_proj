// src/assets/icons/icons.jsx
import React from 'react';

// Импортируем SVG как обычные изображения
import attachIcon from './icons/attach.svg';
import downloadIcon from './icons/download.svg';
import ghostIcon from './icons/ghost.svg';
import lightIcon from './icons/light.svg';
import lockNoOpenIcon from './icons/lockNoOpen.svg';
import lockOpenIcon from './icons/lockOpen.svg';
import moonIcon from './icons/moon.svg';
import notesIcon from './icons/notes.svg';
import scheduleIcon from './icons/schedule.svg';
import shelledIcon from './icons/shelled.svg';
import sunIcon from './icons/sun.svg';
import teaIcon from './icons/tea.svg';
import userIcon from './icons/user.svg';
import questionIcon from './icons/question.svg';
import infoIcon from './icons/info.svg';
import wallet from './icons/wallet.svg'
import nft from './icons/nft.svg'
import rocket from './icons/rocket.svg'
import lesson from './icons/lesson.svg'
import heart from './icons/heart.svg'
// Создаем React компоненты-обертки

export const Heart = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={heart} 
    alt="attach" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);


export const Lesson = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={lesson} 
    alt="attach" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Attach = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={attachIcon} 
    alt="attach" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Nft = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={nft} 
    alt="attach" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Rocket = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={rocket} 
    alt="attach" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Download = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={downloadIcon} 
    alt="download" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Wallet = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={wallet} 
    alt="download" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Ghost = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={ghostIcon} 
    alt="ghost" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Light = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={lightIcon} 
    alt="light" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const LockNoOpen = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={lockNoOpenIcon} 
    alt="lock no open" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const LockOpen = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={lockOpenIcon} 
    alt="lock open" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Moon = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={moonIcon} 
    alt="moon" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Notes = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={notesIcon} 
    alt="notes" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Schedule = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={scheduleIcon} 
    alt="schedule" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Shelled = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={shelledIcon} 
    alt="shelled" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Sun = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={sunIcon} 
    alt="sun" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Tea = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={teaIcon} 
    alt="tea" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const User = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={userIcon} 
    alt="user" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Question = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={questionIcon} 
    alt="question" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

export const Info = ({ width = 24, height = 24, style, className, ...props }) => (
  <img 
    src={infoIcon} 
    alt="info" 
    width={width} 
    height={height}
    style={style}
    className={className}
    {...props}
  />
);

// Объект для удобного доступа к иконкам по имени
export const icons = {
  attach: Attach,
  download: Download,
  ghost: Ghost,
  light: Light,
  lockNoOpen: LockNoOpen,
  lockOpen: LockOpen,
  moon: Moon,
  notes: Notes,
  schedule: Schedule,
  shelled: Shelled,
  sun: Sun,
  tea: Tea,
  user: User,
  question: Question,
  info: Info,
  wallet: Wallet,
  nft: Nft,
  rocket: Rocket,
  lesson: Lesson,
  heart: Heart,

};

// Массив ссылок с иконками
export const iconLinks = [
  {
    id: 1,
    name: 'user',
    label: 'Профиль',
    url: '/profile',
    icon: User,
    description: 'Перейти в профиль пользователя'
  },
  {
    id: 2,
    name: 'notes',
    label: 'Заметки',
    url: '/notes',
    icon: Notes,
    description: 'Мои заметки'
  },
  {
    id: 3,
    name: 'schedule',
    label: 'Расписание',
    url: '/schedule',
    icon: Schedule,
    description: 'Просмотреть расписание'
  },
  {
    id: 4,
    name: 'download',
    label: 'Загрузки',
    url: '/downloads',
    icon: Download,
    description: 'Скачанные файлы'
  },
  {
    id: 5,
    name: 'attach',
    label: 'Вложения',
    url: '/attachments',
    icon: Attach,
    description: 'Прикрепленные файлы'
  },
  {
    id: 6,
    name: 'lockOpen',
    label: 'Безопасность',
    url: '/security',
    icon: LockOpen,
    description: 'Настройки безопасности'
  },
  {
    id: 7,
    name: 'tea',
    label: 'Перерыв',
    url: '/break',
    icon: Tea,
    description: 'Время для перерыва'
  },
  {
    id: 8,
    name: 'light',
    label: 'Освещение',
    url: '/lighting',
    icon: Light,
    description: 'Настройки освещения'
  },
  {
    id: 9,
    name: 'ghost',
    label: 'Скрытое',
    url: '/hidden',
    icon: Ghost,
    description: 'Скрытый раздел'
  },
  {
    id: 10,
    name: 'question',
    label: 'Помощь',
    url: '/help',
    icon: Question,
    description: 'Помощь и поддержка'
  },
  {
    id: 11,
    name: 'info',
    label: 'Информация',
    url: '/info',
    icon: Info,
    description: 'Полезная информация'
  },
  {
    id: 12,
    name: 'wallet',
    label: 'Wallet',
    url: '/wallet',
    icon: Wallet,
    description: 'Урок по крипте'
  },
  {
    id: 13,
    name: 'nft',
    label: 'Нфт',
    url: '/nft',
    icon: Nft,
    description: 'Урок по НФТ'
  },
  {
    id: 14,
    name: 'lesson',
    label: 'Уроки',
    url: '/lesson',
    icon: Lesson,
    description: 'Количество уроков'
  },
  {
    id: 15,
    name: 'heart',
    label: 'Избранное',
    url: '/heart',
    icon: Info,
    description: 'Избранное'
  }
];



export default {
  icons,
  Attach,
  Download,
  Ghost,
  Light,
  LockNoOpen,
  LockOpen,
  Moon,
  Notes,
  Schedule,
  Shelled,
  Sun,
  Tea,
  User,
  Question,
  Info,
  Wallet,
  Nft,
  Heart,
  Lesson
};