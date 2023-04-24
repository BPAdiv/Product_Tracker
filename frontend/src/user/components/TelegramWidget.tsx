import { useContext, useEffect } from "react";
import axios from "axios";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";
import { UserContext } from "../../contexts/userContext";

export default function TelegramWidget() {
  const { user, setUser } = useContext(UserContext);

  const onTelegramAuth = async (telegramUser: any) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/telegram/connect`,
        { telegramId: telegramUser.id, userId: user?._id }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TelegramLoginButton
        botName="AmazonNodeBot"
        dataOnauth={(telegramUser: TelegramUser) =>
          onTelegramAuth(telegramUser)
        }
        requestAccess
      />
      {/* <div>
      <div id="telegram-login-widget"></div>
    </div> */}
    </>
  );
}
