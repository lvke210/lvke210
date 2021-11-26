/*
 * @Description:  
 * @Author: owen
 * @Date: 2021-10-21 14:34:49
 * @LastEditTime: 2021-10-21 14:54:44
 */
window.addEventListener("scroll", () => {
  const scrollPosition = window.pageYOffset;
  const formPosition = document.querySelector("#form");
  formPosition.style.transform = `translateY(${scrollPosition * 0.8}px)`;
  // formPosition.style.transform = `translate(-100%, ${scrollPosition * 0.8 + 200}px)`;
});