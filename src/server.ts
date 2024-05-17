import app from "./app"
import mongoose from "mongoose";
import config from "./app/config";
import { Server } from 'http';

let server: Server;

async function main() {
 
    try{
        await mongoose.connect(process.env.DATABASE_URL as string );
        app.listen(config.port, () => {
          console.log(`PH University server is running on port ${config.port}`)
        })
    }catch(err){
        console.log(err)
    }
  
}

main()

process.on('unhandledRejection', (err) => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    }
    process.exit(1);
  });
  
  process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
  });
  
