import dateFormat from 'dateformat';

const actionLogger = store => next => action => {
  const now = new Date();
  console.group(`Action: ${action.type}`);
  console.log(`time: ${dateFormat(now, 'HH:MM:ss')}`);
  console.log(`date: ${dateFormat(now, 'dd.mm.yyyy')}`);
  console.log(action);
  console.groupEnd();
  return next(action);
};

export default actionLogger;