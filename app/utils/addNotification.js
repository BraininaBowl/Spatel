export default function async (message, type = "info") {
  const notificationsArea = document.querySelector("#notifications");
  if (notificationsArea) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.classList.add("fade");
    notification.classList.add(`${type}`);
    notification.innerText = message;
    notificationsArea.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.remove('fade')
    }, 250);
    setTimeout(() => {
      notification.classList.add('fade')
    }, 7000);
    setTimeout(() => {
      notificationsArea.removeChild(notification);
    }, 7250);
  }
}