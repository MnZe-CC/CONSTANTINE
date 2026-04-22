# Constantine, Algeria - City of Bridges

A presentative website about Constantine, one of the oldest cities in North Africa.

## Files

- `index.html` - Main HTML structure with all content sections
- `style.css` - Complete responsive styling with animations
- `script.js` - JavaScript for interactivity and animations
- `nginx.conf` - Nginx configuration for deployment
- `README.md` - This file

## Content Sections

1. **Hero** - Stunning hero with city name and tagline
2. **Quick Facts** - Key statistics about the city
3. **History** - Interactive timeline from 203 BC to 2015
4. **Bridges** - The 8 famous bridges with details
5. **Landmarks** - 8 major landmarks and monuments
6. **Culture** - Arts, cuisine, music, architecture, traditions
7. **Gallery** - Image gallery placeholders
8. **Visit** - Practical visitor information
9. **Footer** - Links and credits

## Quick Start (Local)

Simply open `index.html` in a web browser.

## Deployment to Production

### 1. Copy files to web root

```bash
sudo mkdir -p /var/www/constantine
sudo cp -r /home/nidami/.openclaw/workspace/con/* /var/www/constantine/
sudo chown -R www-data:www-data /var/www/constantine
```

### 2. Configure Nginx

```bash
sudo cp /var/www/constantine/nginx.conf /etc/nginx/sites-available/constantine
sudo ln -sf /etc/nginx/sites-available/constantine /etc/nginx/sites-enabled/constantine
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 3. Obtain SSL Certificate (requires a domain)

If you have a domain pointing to this server:

```bash
sudo certbot certonly --webroot -w /var/www/constantine -d your-domain.com
```

Then edit `/etc/nginx/sites-available/constantine`:
- Uncomment the HTTPS server block
- Replace `your-domain.com` with your actual domain
- Uncomment the HTTP-to-HTTPS redirect

Finally:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Firewall (optional but recommended)

```bash
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Information Sources

Content compiled from public sources:
- Wikipedia: Constantine, Algeria
- Travel guides and tourism websites
- Historical references

## License

Educational purposes. All information from public sources.
