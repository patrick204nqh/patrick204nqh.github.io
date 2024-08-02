---
title: "Handling Missing Assets with Custom Middleware in Rails"
date: 2024-08-01
header:
  teaser: /assets/images/posts/2024-08-01-handling-missing-assets-with-custom-middleware.webp
categories:
  - tech
  - ruby
tags:
  - rails
  - ruby on rails
  - middleware
  - development
  - local assets
sidebar:
  - title: "Efficient Asset Handling"
    text: "Discover how custom middleware can help us efficiently manage missing assets in a Rails application, ensuring smooth development and improved performance."
    image: /assets/images/posts/2024-08-01-handling-missing-assets-with-custom-middleware.webp
    image_alt: "Rails middleware"
---

During our development process, we may encounter issues with fetching images from our system. If an asset is missing, Rails will continue routing until it expires, which can slow down development or affect system performance in public environments if we use assets from the Rails app instead of third-party services like S3. While using Amazon S3 can mitigate this issue, there are scenarios where we might need to replicate data from a public environment without access to its S3 assets. In such cases, setting up local assets can be a solution. This post provides a method for fetching local assets without waiting for Rails routing by using custom middleware.

### Implementing Middleware for Local File System

#### Step 1: Middleware Implementation

First, we need to create the middleware file in `lib/middleware/missing_asset_fallback.rb`:

```ruby
# lib/middleware/missing_asset_fallback.rb
class MissingAssetFallback
  def initialize(app)
    @app = app
  end

  def call(env)
    path = env['PATH_INFO']

    if asset_request?(path)
      asset_path = Rails.root.join('public', path)

      if File.exist?(asset_path)
        log("Serving existing asset: #{path}", :green)
        return serve_file(asset_path)
      else
        default_image_path = Rails.root.join('public', 'system', 'default_image.jpg')
        log("Asset not found, serving default image: #{default_image_path}", :yellow)
        return serve_file(default_image_path)
      end
    end

    @app.call(env)
  end

  private

  def asset_request?(path)
    path.start_with?('/system/') && path.match(/\.(png|jpg|jpeg|gif)$/)
  end

  def serve_file(path)
    mime_type = Rack::Mime.mime_type(File.extname(path))
    [200, { 'Content-Type' => mime_type }, [File.read(path)]]
  end

  def log(message, color = :default)
    color_code = color_code(color)
    reset_code = color_code(:default)
    puts "#{color_code}#{message}#{reset_code}"
  end

  def color_code(color)
    case color
    when :red
      "\e[31m"
    when :green
      "\e[32m"
    when :yellow
      "\e[33m"
    when :blue
      "\e[34m"
    when :magenta
      "\e[35m"
    when :cyan
      "\e[36m"
    else
      "\e[0m"
    end
  end
end
```

#### Step 2: Adding Middleware to Development Environment

Next, we add the middleware to our development environment in `config/environments/development.rb`:

```ruby
# config/environments/development.rb

Rails.application.configure do
  # Other configurations...

  require Rails.root.join('lib', 'middleware', 'missing_asset_fallback')
  config.middleware.use ::MissingAssetFallback
end
```

#### Step 3: Ensure Default Image Exists

Place a default image at `public/system/default_image.jpg`. You can customize the path and the image according to your project's requirements.

### Example Output

Let's see how this middleware behaves when a requested asset is missing:

#### Scenario

- **Requested Asset**: A client requests an image at `/system/uploads/image.png`.
- **Outcome**: The image does not exist in the system, so the middleware serves the default image located at `public/system/default_image.jpg`.

#### Console Log Output

```plaintext
Asset not found, serving default image: /path/to/your/project/public/system/default_image.jpg
```

#### HTTP Response

The HTTP response sent back to the client will be:

- **Status Code**: `200 OK`
- **Headers**:
  - `Content-Type`: `image/jpeg` (or the appropriate MIME type of the default image)
- **Body**: The binary content of `default_image.jpg`

#### Browser Behavior

In the browser, users will see the default image instead of a broken link or missing asset icon.

### Testing and Validation

1. **Ensure the default image is present** at `public/system/default_image.jpg`.
2. **Test by requesting** an existing asset and a non-existing asset to confirm the middleware is working correctly.

### Conclusion

By implementing this middleware, we can effectively handle missing assets by serving a default image. This approach prevents unnecessary routing delays and improves development and performance efficiency. This solution is particularly useful when working with local assets without access to S3.

If you have any other good ideas or improvements, please feel free to share them in the comments below. Happy coding!
