import { Command } from '@/types/Command';
import Hello from '@/commands/hello';
import SoundPing from './commands/SoundPing';

const Commands: Command[] = [Hello, SoundPing];

export { Commands };
