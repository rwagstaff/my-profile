package rw.cv

import static org.junit.Assert.*
import groovy.mock.interceptor.MockFor

import org.junit.Test

class CVServiceTest {

    @Test
    public void shouldFindAllCVs() {
        def mock = new MockFor(CVRepository)
        mock.demand.findAll(1) {
            [
                new CV(title : 'Senior'),
                new CV(title: 'Junior')
            ]
        }
        def cvService = new CVService()
        cvService.repository = mock.proxyInstance()
        def cvs = cvService.findAllCVs()
        assert cvs.size() == 2
        mock.verify(cvService.repository)
    }
}
