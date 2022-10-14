module.exports = {
  prompt: ({inquirer}) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: 'Имя компонента',
      },
      {
        type: 'input',
        name: 'dir',
        message: 'Вложенная директория?(Optional)'
      }
    ]


    return inquirer.prompt(questions).then(answers => {
      const {component_name, dir} = answers;
      const path = `${dir ? `${dir}/` : ''}${component_name}`;
      const absPath = `src/components/${path}`;
      return {...answers, path, absPath};
    });
  }
}