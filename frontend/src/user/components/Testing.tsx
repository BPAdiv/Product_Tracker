import { useEffect } from "react";
import axios from "axios";

export default function Testing() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    // script.setAttribute("data-telegram-login", "bot username");  //TO CONFIGURATION
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    document.getElementById("telegram-login-widget")?.appendChild(script);
  }, []);

  const onTelegramAuth = (user: any) => {
    console.log(user);

    // axios.post('http://localhost:8000/auth', {token: user.auth_token})
    //   .then((response) => {
    //     // handle successful authentication
    //   })
    //   .catch((error) => {
    //     // handle authentication error
    //   });
  };

  return (
    <div>
      <div id="telegram-login-widget"></div>
    </div>
  );
}
