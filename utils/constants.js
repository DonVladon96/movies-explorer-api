const http2 = require('http2');

const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_OK,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_FORBIDDEN,
} = http2.constants;

const MovieForbiddenMessage = 'Доступ запрещен, можно удалять только свои фильмы!';
const MovieNotFoundMessage = 'Видео с таким идентификатором не найден!';
const UserNotFoundMessage = 'Пользователь не найден!';
const UserConflictMessage = 'Такой пользователь уже зарегестрирован!';
const BadRequestMessage = 'Введены некорректные данные!';
const ServerNotFoundMessage = 'Сервер не найден!';
const AuthErrorMessage = 'Необходима авторизация!';

const NOT_FOUND_ERROR = '404 Not Found';
const REGEX_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
module.exports = {
  NotFoundError: NOT_FOUND_ERROR,
  REGEX_URL,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_OK,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_FORBIDDEN,
  MovieForbiddenMessage,
  MovieNotFoundMessage,
  UserNotFoundMessage,
  UserConflictMessage,
  BadRequestMessage,
  ServerNotFoundMessage,
  AuthErrorMessage,
};
