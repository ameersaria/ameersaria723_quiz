#! /usr/bin/env node
import inquirer from "inquirer"
import chalk from "chalk"
// let a = await inquirer.prompt({
//     type:"input",
//     name:"fName",
//     message:"What is your name"
// })
// console.log(chalk.blue(a.fName));

const apiLink:string="https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple"

let fetchData=async(data:string) => {
    let fetchQuiz:any=await fetch(data)
    let response=await fetchQuiz.json()
    return response.results;
}
 let variable= await fetchData(apiLink);

 let startQuiz= async()=>{
    let score:number=0;
    // for userName 
    let name= await inquirer.prompt({
        name:"fName",
        type:"input",
        message:"What is your name?"
    })
    for(let i=1;i<=5;i++){
        let answers=[...variable[i].incorrect_answers,variable[i].correct_answer]
        let ans=await inquirer.prompt([{
            type:"list",
            name:"quiz",
            message:variable[i].question,
            choices:answers.map((val:any) => val),        }]);
            if(ans.quiz==variable[i].correct_answer){
                ++score
            console.log(chalk.bold.italic.green("Correct"));
            }else{
                console.log(`Current answer is ${chalk.bold.italic.red(variable[i].correct_answer)}`);
            }
    }
    console.log(`Dear ${chalk.green.bold(name.fName)}, your score is ${chalk.blue.bold(score)} out of ${chalk.blue.bold('5')}`);
    
 }
 startQuiz()
