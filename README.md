# Solution

If I had assumed that data loss was acceptable (which, looking at the sensor data, seems reasonable), I would have approached this differntly. In particular, I would have looked at using UDP instead of TCP to transfer messages, and also omitting unnecessary fields (perhaps the time stamp) from the messages.

Instead, I've assumed the acceptance test as the precise requirements. So all the messages need to be reproduced completely on the server, but order doesn't matter, and we need to keep the latency below 2 seconds, if possible. I'm also assuming that the body of the HTTP POST messages are receiving text compression, so I won't be focusing on the size of the serialized JSON string.

My solution is then, to reduce the number of requests being sent by sending them in batches. This will reduce the number of bytes being sent by
	1. sending fewer headers
	2. allowing the text compression to compress more

I am using a FRP library for composing observables. It originally prevented the program from terminating (which I think wouldn't have been an issue in reality), so I added a timeout hack to allow the test to run properly. I wrote a test using the same tool, more as an example than anything. It took a while for me to figure out how to write tests using this pattern, and I'm not very happy with the results.

I realize now, that I could have separated the observables into their own module, which would have allowed me to define the interface, and be easier to test. But I digress, I've spent enough time on this. I hope I've demonstrated some knowledge.

# Backend Developer Job Applicant Test - Node.js

This is a framework for building a simple client and server in Node.js.  

## Objectives

The purpose of completing this test is to show us how you approach and solve a problem.  Ideally
you should not spend more than 2-3 hours on this.

- **State your assumptions.**  Anywhere you feel that the requirements are unclear please make
an assumption and document that assumption.
- **Describe Trade-offs.** When you're making a decision about using one design/approach vs. another
try to make a quick note about why you made the choice you did.
- **Provide tests.**  You should provide unit tests for the code that you write.  The choice of
testing tools is up to you.


## Requirements

This system simulates a client sending sensor readings to a remote server.  We would like you
to imagine that the client and server are separated by a connection with limited bandwidth.  Please
make an effort to minimize the number of bytes being sent between the client and server.  Messages
don't need to be received in real-time, but try to keep latency below 2 seconds for any given
message.

Please keep in mind that we are much more interested in seeing a well-designed and well-tested
solution than we are in getting the absolute best data compression.  

You are being provided with a basic framework of both the client and server.  It includes a sample
implementation using HTTP POSTs.  The example works, but we think you can do better!  Modify or
replace the provided implementation.  (Don't modify the existing file-reading and event emitting
logic.)

### Client

The provided code will read the sensor readings from a file and provide them at random intervals
(between 0 and 1000ms).  You job is to handle these messages and send them in an efficient manner
to the server.  Make your changes in the `sender/transmit.js` file.

### Server

Please print the received messages to `STDOUT` as in the example.  If you have other things you want
to output please use `STDERR`.

Make your changes in the `receiver/index.js` file.

## Test Script

We have provided a `bash` script for doing acceptance testing.  It will run both the client and
server.  It captures the output of the server, sorts it and then compares it to the input.  If they
are the same the test passes.  This should help to evaluate your solution.
