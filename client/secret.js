const token = localStorage.getItem("token")

token || window.location.replace("/")
