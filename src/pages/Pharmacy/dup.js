const handleDispense = async (planId, pharmacist_username, drugIndex) => {
  try {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const response = await axios.patch(
      `http://localhost:8080/pharmacy/dispense/${planId}`,
      {
        pharmacist_username,
        drugIndex,
      }
    );

    toast.success(response.data.message);
    return response.data.plan;
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to dispense medications"
    );
    return null;
  } finally {
    setLoading(false);
  }
};
