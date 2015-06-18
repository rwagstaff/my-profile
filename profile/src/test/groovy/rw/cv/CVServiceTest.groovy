package rw.cv

import static org.junit.Assert.*

import org.junit.Test

class CVServiceTest {

    @Test
    public void shouldFindCV() {
        CVService service= new CVService()
        CV richardCv = service.findCVs()
        assert richardCv.title == 'Senior Developer'
    }
}
