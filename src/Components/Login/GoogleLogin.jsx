import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function GoogleLogin({ buttonText }) {
  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_AUTH_URL}/api/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem("token", token);

      // Temporary solution
      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      registerLoginWithGoogleAction(responseGoogle.access_token),
  });

  return (
    <Button
      variant="outline-secondary"
      style={{ width: "100%", height: "45px" }}
      onClick={() => loginWithGoogle()}
    >
      {buttonText} Sign in with Google
    </Button>
  );
}

GoogleLogin.propTypes = {
  buttonText: PropTypes.object,
};

export default GoogleLogin;
