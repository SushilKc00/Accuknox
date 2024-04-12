const asynchHandler = (asyncHandlerFunction) => {
  return (req, res, next) => {
    Promise.resolve(asyncHandlerFunction(req, res, next)).catch(next);
  };
};

export default asynchHandler;
