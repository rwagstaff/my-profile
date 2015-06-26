package rw.cv

import org.junit.Before
import org.junit.Ignore
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.IntegrationTest
import org.springframework.boot.test.SpringApplicationConfiguration
import org.springframework.boot.test.TestRestTemplate
import org.springframework.http.ResponseEntity
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.test.context.web.WebAppConfiguration

import rw.Application

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest([
    'server.port=0'
])
class CVControllerTest {

    @Value('${local.server.port}')
    def port

    def base
    def template

    @Before
    public void setUp() {
        this.base = new URL('http://localhost:' + port)
        template = new TestRestTemplate()
    }

    @Test
    public void shouldFindAllCVs() {
        ResponseEntity<String> response = template.getForEntity(base.toString() + '/cv/' , String.class)
        assert response.getBody() != null
    }

    @Test
    @Ignore
    public void shouldFindByName() {
        ResponseEntity<String> response = template.getForEntity(base.toString() + '/cv?name=Richard Wagstaff' , String.class)
        assert response.getBody() != null
    }
}
