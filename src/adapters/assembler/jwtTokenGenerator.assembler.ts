import { IJwtTokenGeneratorAssembler } from "../types";
import { JwtTokenGeneratorAdapter } from "../utils";

export const jwtTokenGeneratorAssembler = (): IJwtTokenGeneratorAssembler => {
  return {
    jwtTokenGenerator: new JwtTokenGeneratorAdapter(),
  };
};
