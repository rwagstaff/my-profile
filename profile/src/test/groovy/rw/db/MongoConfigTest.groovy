package rw.db;

import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.SpringApplicationConfiguration
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

import rw.Application

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application)
public class MongoConfigTest {

    @Autowired
    MongoConfig config

    @Before
    public void hello() {
        println 'hello'
    }

    @Test
    public void shouldLoadConfig() {
        assert config != null
    }
}
