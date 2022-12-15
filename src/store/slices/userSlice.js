import { createSlice } from "@reduxjs/toolkit";

/**
 * Объект с начальным состоянием стора 'user',
 * он необходим нам, т. к. нам потребуется
 * возврат к исходному состоянию в методе logOutUser
 */
const initialState = {
  email: null,
  token: null,
  id: null,
};

export const userSlice = createSlice({
  name: "user",
  /**
   * Если ключ объекта и его значение совпадают
   * (initialState: initialState),
   * то можно записать краткую форму,
   * не дублируя одно и то же второй раз
   */
  initialState,
  reducers: {
    /**
     * Функция, которую будем вызывать после успешной регистрации
     * Принимает на вход объект с информацией о пользователе
     * (поля: email, token, id).
     */
    setUser(state, action) {
      /**
       * Невероятно важный комментарий!
       *
       * Для того, чтобы изменить стейт, ранее,
       * в методах редьюсера basket, мы изменяли его напрямую,
       * обращаясь state, как к объекту, по ключу,
       * переопределяя его значение:
       * state.items = newBasketItems
       *
       * Такой подход нестандартен для обычного редакса,
       * но его надстройка, 'redux-toolkit',
       * позволяет таким образом менять стейт.
       *
       * За такую возможность отвечает библиотека 'immer',
       * которая работает под капотом 'redux-toolkit'.
       * Это описано в документации на:
       * https://redux-toolkit.js.org/tutorials/quick-start
       * (https://tppr.me/ja76O)
       *
       * Нестандартен этот подход потому, что стейт редакса
       * по умолчанию считается иммутабельным...
       *
       * (дословно - "неизменяемым",
       * про иммутабельность и мутабельность более подробно
       * прочитайте в интернете, например, на:
       * https://habr.com/ru/company/developersoft/blog/302118/),
       *
       * ...то есть к нему нельзя напрямую обратиться
       * (как делали это в методах basketSlice)
       * и изменить его значение.
       *
       * Для изменения значения стейта необходимо
       * из метода редьюсера "вернуть" (через ключевое слово 'return')
       * новое состояние, тогда оно корректно обновится в сторе.
       *
       * В 'action.payload', напоминаю,
       * будет находится объект с тремя полями:
       * email, token, id, значениями которых
       * мы заменим предыдущее состояние стора 'user'
       *
       * В большинстве случаев применяют именно подобный
       * синтаксис "возврата" нового состояния
       */
      return action.payload;
    },
    logOutUser() {
      /**
       * Для выхода из аккаунта,
       * достаточно вернуть в качестве нового стейта
       * объект с исходной информацией,
       * где все поля имеют значение 'null'
       */
      return initialState;
    },
  },
});

export const { setUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;