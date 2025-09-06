package com.example.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
public class StockController {
    private final WebClient webClient;
    private final String API_KEY = "d2aln69r01qgk9ufh7vgd2aln69r01qgk9ufh800";

    public StockController(){
        this.webClient = WebClient.builder()
            .baseUrl("https://finnhub.io/api/v1")
            .build();
    }

    @GetMapping("/api/quote")
    public Mono<String> getStockQuote(@RequestParam String symbol) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/quote")
                        .queryParam("symbol", symbol)
                        .queryParam("token", API_KEY)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }
    
}
