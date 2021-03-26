package com.example.messagingstompwebsocket.controller;

import com.example.messagingstompwebsocket.vo.Greeting;
import com.example.messagingstompwebsocket.vo.HelloMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

	@MessageMapping("/hello")
	@SendTo("/topic/greetings")
	public Greeting greeting(HelloMessage message) throws Exception {
		Thread.sleep(1000); // simulated delay
		return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
	}

	@MessageMapping("/user.{userId}")
	public void handleUser(@DestinationVariable String userId) {
		System.out.println(userId);
		// ...
	}

	@MessageExceptionHandler
	public Exception handleException(Exception ex) {
		System.out.println(ex);
		// ...
		return ex;
	}

}
