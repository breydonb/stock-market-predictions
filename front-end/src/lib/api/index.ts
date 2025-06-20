import { FastApiClient } from "./FastApiClient";
import { SpringApiClient } from "./SpringApiClient";

import { Logger } from "$lib/utils/Logger";

const logger = new Logger();

export const fastApiClient = new FastApiClient(logger);
export const springApiClient = new SpringApiClient(logger);