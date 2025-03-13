const { default: axios } = require("axios");

const SendEmail = async (data) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`, data);
      console.log("Email enviado com sucesso!", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error.response?.data || error.message);
      throw error;
    }
  };
  

export default{
    SendEmail
}