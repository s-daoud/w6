document.addEventListener("DOMContentLoaded", addClicks);

function addClicks() {
  let sidebar = document.getElementsByClassName('sidebar-nav');
  let li = sidebar[0].getElementsByTagName('li');
  // debugger
  Array.from(li).forEach( (el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = e.currentTarget.innerText.toLowerCase();
    });
  });
}
