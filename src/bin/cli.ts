#!/usr/bin/env node
import { createProgram } from '../core/program';

const program = createProgram();
program.parse(process.argv);
