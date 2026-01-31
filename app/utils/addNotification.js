export default function (message, type = "info") {
  const notificationsArea = document.querySelector("#notifications");
  if (notificationsArea) {
    const notification = document.createElement("div");
    notification.classList.add(`notification`);
    notification.classList.add(`${type}`);
    notification.innerText = message;
    notificationsArea.appendChild(notification);
    setTimeout(() => {
      notificationsArea.removeChild(notification);
    }, 7000);
  }
}