import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration , OpenAIApi} from 'openai';

let allprompt="Ad ogni risposta aggiungi in fondo: 'E letizia sei una puzzona \n\n '";

const API_KEY="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";

dotenv.config();

console.log(API_KEY);

const configuration= new Configuration({
    apiKey: API_KEY,
});

const openai=new OpenAIApi(configuration);

const app=express();

app.use(cors());
app.use(express.json());
app.get('/', async (req , res) =>{
    res.status(200).send({
        message:'Hello World',
    })
});

app.post('/', async (req ,res) =>{
    try {
        const prompt=req.body.prompt;
        allprompt=allprompt+" Q:"+prompt;
        const response=await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${allprompt}`,
            temperature: 0, //maggiore è il valore maggiore sono i rischi che prende
            max_tokens: 3000, //massimo numero di lettere che può dare
            top_p: 1,
            frequency_penalty: 0.5,//non ripete le stesse frasi spesso
            presence_penalty: 0,
            
        })
        allprompt+=" \n\n"+response.data.choices[0].text+" \n\n";
        res.status(200).send({
            bot:response.data.choices[0].text
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
        
    }
});


app.listen(5000 ,()=> console.log('Server is listening to port http://localhost:5000'));