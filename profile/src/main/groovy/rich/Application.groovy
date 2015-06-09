package rich;

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.ConfigurableApplicationContext
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource

@SpringBootApplication
@Configuration
@ComponentScan
@EnableAutoConfiguration
class Application {

    static void main(String[] args) {
        Object[] source = [
            Application.class,
            new ClassPathResource("META-INF/context.groovy")
        ];
        ConfigurableApplicationContext context =  SpringApplication.run(source, args);
    }
}
