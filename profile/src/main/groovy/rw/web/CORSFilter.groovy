package rw.web;

import javax.servlet.Filter
import javax.servlet.FilterChain
import javax.servlet.FilterConfig
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletResponse

import org.springframework.stereotype.Component

@Component
class CORSFilter implements Filter {

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {
        HttpServletResponse response = (HttpServletResponse) res
        // Can't use wildcard with Allow-Credentials, so set request url as accepted
        response.setHeader("Access-Control-Allow-Origin", requestUrl(req))
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        response.setHeader("Access-Control-Max-Age", "3600")
        //response.setHeader("Access-Control-Allow-Headers", "x-user, x-password, x-otpassword, x-command, Authorization, Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true")
        //response.setHeader("Access-Control-Expose-Headers", "x-token")
        chain.doFilter(req, res)
    }

    @Override
    void init(FilterConfig filterConfig) {
        // DO nothing
    }

    @Override
    public void destroy() {
        // Do nothing
    }

    private String requestUrl(ServletRequest req) {
        return ((javax.servlet.http.HttpServletRequest) req).getHeader("origin")
    }
}
