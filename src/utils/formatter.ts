
// FUNÇÃO PARA FORMATAR DATAS
export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

// FUNÇÃO PARA FORMATAR VALORES
export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

// FUNÇÃO PARA FORMATAR O CPF
export const formatCpf = (value: string) => {
  value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
  value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto entre o terceiro e quarto dígitos
  value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto entre o sexto e sétimo dígitos
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona hífen entre o nono e décimo dígitos
  return value;
};

