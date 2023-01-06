/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: 'http://moida-skhu.duckdns.org/:path*',
            },
            {
                source: '/:path*',
                has: [
                    {
                        type: 'header',
                        key: 'Authorization',
                        value: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MDEiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjczMDczNDgzfQ.6-KDa7uMjByDZP7643ri6SmqBki80cqVdJziei3DbaU',
                    }
                ],
                destination: 'http://moida-skhu.duckdns.org/:path*',
            },
        ];
    },
};

module.exports = nextConfig;