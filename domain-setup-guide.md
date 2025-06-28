# Connecting Your WeCan Fly Website to Your GoDaddy Domain

This guide will walk you through how to connect your static WeCan Fly website to a domain name purchased from GoDaddy.

## Option 1: Using GoDaddy's Hosting Service

If you want to use GoDaddy's own hosting service:

1. **Log in to your GoDaddy account**
   - Go to [godaddy.com](https://www.godaddy.com/) and sign in to your account

2. **Purchase a hosting plan**
   - Go to "Web Hosting" in your products or browse to GoDaddy's hosting options
   - Select an appropriate plan (for a simple static site, the basic or economy plan is usually sufficient)
   - Complete the purchase process

3. **Connect your domain to your hosting**
   - This is typically done automatically if you purchase hosting for a domain you already own at GoDaddy

4. **Upload your website files**
   - From your GoDaddy account dashboard, navigate to your hosting control panel
   - Find the File Manager or use FTP credentials provided by GoDaddy
   - Upload all files from your `/Users/amit.pandey/Wecan_Hustle/wecan_fly/wecan-fly-website/` directory to the root directory of your hosting (usually `public_html` or `www`)
   - Make sure to maintain the same directory structure

5. **Test your website**
   - Visit your domain name in a browser to ensure everything is working correctly
   - Check that all links, images, and pages are functioning properly

## Option 2: Using GitHub Pages with Your Domain

This option is free and great for static websites:

1. **Create a GitHub account** (if you don't already have one)
   - Go to [github.com](https://github.com/) and sign up

2. **Create a new repository**
   - Name it with your domain name or website name
   - Make it public

3. **Upload your website files to GitHub**
   - You can either use the GitHub Desktop app, Git command line, or upload directly through the GitHub web interface
   - Push/upload all files from your `/Users/amit.pandey/Wecan_Hustle/wecan_fly/wecan-fly-website/` directory

4. **Enable GitHub Pages**
   - Go to your repository Settings > Pages
   - Select the branch that contains your website files (usually `main` or `master`)
   - Choose the root directory for your site
   - Click Save

5. **Add a custom domain in GitHub Pages settings**
   - In the same Pages settings section, enter your GoDaddy domain name in the "Custom domain" field
   - Save the setting
   - GitHub will create a file called `CNAME` in your repository

6. **Configure DNS settings at GoDaddy**
   - Log in to your GoDaddy account
   - Go to "Domains" and select your domain
   - Click "DNS" or "Manage DNS"
   - You'll need to add several records:
     - Add an A record pointing to GitHub Pages IP addresses:
       * Create A record with host `@` pointing to `185.199.108.153`
       * Create A record with host `@` pointing to `185.199.109.153`
       * Create A record with host `@` pointing to `185.199.110.153`
       * Create A record with host `@` pointing to `185.199.111.153`
     - For the www subdomain:
       * Create a CNAME record with host `www` pointing to `yourusername.github.io` (replace with your GitHub username)

7. **Wait for DNS propagation**
   - DNS changes can take 24-48 hours to fully propagate
   - You can check the status by using the `dig` command in terminal or online DNS lookup tools

8. **Verify your domain on GitHub**
   - GitHub will automatically attempt to verify your domain
   - You should see a "Verified" badge in the GitHub Pages settings once it's successful

9. **Enable HTTPS**
   - After verification is complete, check the "Enforce HTTPS" option in GitHub Pages settings

## Option 3: Using Netlify (Free and Easy)

Netlify offers generous free hosting for static sites with many additional features:

1. **Create a Netlify account**
   - Go to [netlify.com](https://www.netlify.com/) and sign up (you can use your GitHub account)

2. **Upload your site directly**
   - From the Netlify dashboard, drag and drop your entire website folder onto the upload area
   - Alternatively, connect your GitHub repository if you've pushed your site there

3. **Configure your site**
   - Give your site a name (this will determine the default Netlify subdomain)
   - Configure build settings if needed (not typically necessary for simple static sites)

4. **Add your custom domain**
   - Go to Site settings > Domain management > Add custom domain
   - Enter your GoDaddy domain name and follow the verification steps

5. **Configure DNS settings at GoDaddy**
   - Log in to your GoDaddy account
   - Go to "Domains" and select your domain
   - Click "DNS" or "Manage DNS"
   - You have two options:
     - Option A: Point the domain to Netlify's nameservers (recommended)
       * In GoDaddy, change the nameservers to Netlify's nameservers (Netlify will provide these)
     - Option B: Create individual DNS records
       * Create a CNAME record with host `www` pointing to your Netlify site address (something.netlify.app)
       * Create A records for the apex domain (@) pointing to Netlify's load balancer IPs (Netlify will provide these)

6. **Enable HTTPS**
   - Netlify automatically provisions a free SSL certificate through Let's Encrypt
   - This process begins automatically after DNS is configured correctly

7. **Wait for DNS propagation**
   - DNS changes can take 24-48 hours to fully propagate
   - Netlify will show the status of domain configuration in your site settings

## Option 4: Using Amazon S3 + CloudFront (Scalable but More Technical)

For more advanced users who might need additional scalability:

1. **Create an AWS account**
   - Sign up at [aws.amazon.com](https://aws.amazon.com/)

2. **Create an S3 bucket**
   - Name the bucket with your domain name (e.g., example.com)
   - Configure it for static website hosting
   - Upload all your website files maintaining the directory structure

3. **Set up CloudFront distribution**
   - Create a new distribution pointing to your S3 bucket
   - Configure settings for HTTPS, caching, etc.

4. **Configure your domain with Route 53 or GoDaddy**
   - Either transfer your domain's DNS management to Route 53, or
   - Configure CNAME/ALIAS records at GoDaddy pointing to your CloudFront distribution

## Troubleshooting Common Issues

- **Website not appearing after DNS configuration**: DNS changes can take up to 48 hours to propagate. Try clearing your browser cache or using a different browser.

- **Mixed content warnings**: If your site loads over HTTPS but shows warnings, you may have hard-coded HTTP links in your HTML. Search your code for "http://" links and update them.

- **Missing images or broken links**: Ensure all file paths are correct. For relative paths, make sure they match your directory structure on the hosting provider.

- **404 errors**: Check that your index.html file is in the root directory and named correctly according to your hosting provider's requirements.

## Maintenance Recommendations

1. **Regular backups**: Always keep a local copy of your website files
2. **Monitor domain and hosting expiration**: Set reminders for renewal
3. **Regular content updates**: Keep your site fresh and relevant
4. **Security updates**: If you add any scripts or tools later, keep them updated
