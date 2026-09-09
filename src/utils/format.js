export function formatDate(dateString) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(dateString));
}

export function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : "?";
}