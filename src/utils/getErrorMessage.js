export default (error) => {
  if (!error.response) {
    return 'Erro ao se conectar com o servidor.';
  }
  const { data } = error.response;

  return data.message ? data.message : data;
};
