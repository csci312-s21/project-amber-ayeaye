

import { render, screen } from "@testing-library/react";
import path from "path";
import request from "supertest";
import fetchMock from "fetch-mock-jest";
import {
  startApp,
  stopApp,
  nextBuild,
  nextServer,
} from "../test-utils/next-test-utils";
import { getSession, useSession } from "next-auth/client";

import SecureItems from "../components/SecureItems";


const appDir = path.join(__dirname, "../../");


jest.setTimeout(1000 * 15);

jest.mock("next-auth/client"); 


describe("Server tests", ()=>{
 let server;

 beforeAll( async ()=>{
  //await stopApp(server); 
  await nextBuild(appDir);
    const app = nextServer({
      dir: appDir,
      dev: false,
      quiet: true,
    });
   
    server = await startApp(app);
  });

  /**
   * Shut down the server
   */
  afterAll(async () => {
    await stopApp(server)
  });

  test.skip("Secured login gets message", (done)=>{
    getSession.mockReturnValueOnce({user: {name:"somebody"}});

    request(server)
    .get("/api/secret")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect({message:"somebody: Don't Panic!"}, done);
  });

  test.skip("Insecure access is denied", (done)=>{
    getSession.mockReturnValueOnce();

    request(server)
    .get("/api/secret")
    .expect(401, done);
  });

});


describe("Client tests",()=>{

  beforeEach(()=>{
    fetchMock.reset();
    useSession.mockClear();
  });

  test("Secured login displays message", async()=>{
    fetchMock.getOnce("/api/secret", ()=>({message:"Test message"}))
    useSession.mockReturnValue([{user: {name:"someone"}}, false]);
    render(<SecureItems />);
    fetchMock.flush(true);
   
    const message = await screen.findByText("Server message: Test message");
    expect(message).toBeInTheDocument();
    expect(screen.getByText("Welcome someone")).toBeInTheDocument();

  });

  test("Insecure access is denied", async ()=>{
    fetchMock.getOnce("/api/secret", ()=>(401))
    useSession.mockReturnValue([undefined , false]);
    render(<SecureItems />);
    fetchMock.flush(false);

    const message = await screen.findByText("Server message: Unauthorized");
    expect(message).toBeInTheDocument();
    expect(screen.getByText("You are not logged in")).toBeInTheDocument();

  });
})


