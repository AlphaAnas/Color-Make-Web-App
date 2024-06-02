import inquirer from "inquirer";

const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

async function main() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "color",
      message: "Enter a color in hex format:",
      validate: (value: string) => {
        if (hexRegex.test(value)) {
          return true;
        }
        return "Please enter a valid hex color.";
      },
    },
  ]);

  return answers;
}

main()
  .then((answers) => {
    console.log(`You entered a valid hex color: ${answers.color}`);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
