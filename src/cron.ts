let lastCronExecution: Date | null = null;

export const updateCronExecutionTime = () => {
    lastCronExecution = new Date();
};

export const getCronInfo = () => {    
    return lastCronExecution ? lastCronExecution.toISOString() : 'Never executed'    
}
