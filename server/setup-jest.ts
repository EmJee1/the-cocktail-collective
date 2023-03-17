/**
 * Jest does not allow passing custom arguments
 * We get around it by manually adding the environment to the argv here
 * This file is run before every test-suite executes
 */

process.argv.push('--environment', 'test')
