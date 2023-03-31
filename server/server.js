import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration , OpenAIApi} from 'openai';



OPENAI_API_KEY="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";

dotenv.config();

console.log(OPENAI_API_KEY);

const configuration= new Configuration({
    apiKey: OPENAI_API_KEY,
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
        const response=await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0, //maggiore è il valore maggiore sono i rischi che prende
            max_tokens: 3000, //massimo numero di lettere che può dare
            top_p: 1,
            frequency_penalty: 0.5,//non ripete le stesse frasi spesso
            presence_penalty: 0,
            
        })

        res.status(200).send({
            bot:response.data.choices[0].text
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
        
    }
});


app.listen(5000 ,()=> console.log('Server is listening to port http://localhost:5000'));