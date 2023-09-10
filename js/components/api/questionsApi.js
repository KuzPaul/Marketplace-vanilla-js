export const questionsApi = async (dataForm) => {
  try {
    const fetchQuestions = await fetch("https://httpbin.org/post", {
      method: "POST",
      body: dataForm,
    });

    if (!fetchQuestions.ok) {
      console.log(fetchQuestions.ok);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
