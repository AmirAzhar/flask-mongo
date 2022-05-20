/**
 * Reorders the list of applications
 * @param {Array} list - List of applications
 * @param {number} startIndex - Starting index of the list
 * @param {number} endIndex - Ending index of the list
 * @returns {Array} Modified list of applications
 */
export const reorderApplications = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moving an application from one list to another
 * @param {Array} source - List of applications at source
 * @param {Array} destination - List of applications at destination
 * @param {droppableSource} droppableSource - Droppable object of source
 * @param {droppableDestination} droppableDestination - Droppable object of destination
 * @returns {Array} Modified droppable object
 */
export const moveApplication = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
