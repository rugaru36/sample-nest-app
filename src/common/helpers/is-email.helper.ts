export const isEmailHelper = (str: string) => {
  const reg =
    /^[a-zA-Z0-9а-яА-Я]+@([a-zA-Z0-9а-яА-Я]+\.)+[a-zA-Z0-9а-яА-Я]{1,5}$/;
  return reg.test(str);
};
