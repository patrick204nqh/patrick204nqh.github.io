---
title: "Customizable Static Code Analysis for Ruby on Rails"
date: 2024-08-01
header:
  teaser: /assets/images/posts/2024-08-01-customize-static-code-analysis-for-ruby-on-rails.webp
categories:
  - tech
  - ruby
tags:
  - rails
  - ruby on rails
  - code analysis
  - development
  - static analysis
sidebar:
  - title: "Methods of Code Analysis"
    text: "Explore different methods of code analysis to maintain and improve code quality in software projects."
    links:
      - title: "Manual Code Reviews"
        url: "https://dev.to/documatic/code-reviewing-a-ruby-on-rails-application-plm"
        description: "A manual process where developers review each other's code for errors and adherence to coding standards."
      - title: "Linters"
        url: "https://rubocop.org/"
        description: "Tools that automatically check code for stylistic and programming errors."
      - title: "Automated Testing Suites"
        url: "https://guides.rubyonrails.org/testing.html"
        description: "Frameworks that run predefined tests to ensure code behaves as expected."
      - title: "Static Code Analysis"
        url: "https://www.fastruby.io/static-code-analysis"
        description: "Analysis performed on code without executing it, used to find vulnerabilities and improve quality."
      - title: "Dynamic Code Analysis"
        url: "https://dev.to/clouddefenseai/what-is-dynamic-code-analysis-10p4"
        description: "Analysis performed on a running program to identify bugs and performance issues."
      - title: "Code Metrics"
        url: "https://codeclimate.com/blog/deciphering-ruby-code-metrics"
        description: "Quantitative measures of code attributes, such as complexity and maintainability."
    image: /assets/images/posts/2024-08-01-customize-static-code-analysis-for-ruby-on-rails.webp
    image_alt: "Static code analysis"
---

As software projects grow and evolve, maintaining code quality and consistency becomes increasingly challenging. Code analysis is essential for identifying potential issues, ensuring adherence to best practices, and facilitating smooth upgrades to newer versions of frameworks and libraries. Common methods for code analysis include [manual code reviews](https://dev.to/documatic/code-reviewing-a-ruby-on-rails-application-plm), [linters](https://rubocop.org/), and [automated testing suites](https://guides.rubyonrails.org/testing.html).

In this post, I introduce a solution for static code analysis tailored to Ruby on Rails projects. This approach uses customizable detectors to automate the detection of specific syntax patterns that may need attention. As an example, consider the transition from Rails 5.2 to 6.1. While `where.not` with multiple attributes remains supported, updating these patterns across a large codebase can be time-consuming and error-prone. For more details on this change, you can refer to [Rails pull request #36029](https://github.com/rails/rails/pull/36029).

The solution presented here offers a framework for automating static code analysis, enabling developers to efficiently identify and refactor complex or deprecated code patterns in their projects.

### A Flexible Solution for Static Code Analysis

This solution provides a customizable code architecture for scanning Ruby files and identifying specific syntax patterns using detectors. It offers a framework for efficiently identifying and addressing problematic code patterns while allowing for easy extension and modification to suit project-specific needs.

#### Key Features

- **Custom Detectors**: Easily define detectors to identify specific syntax patterns.
- **Automated Scanning**: Streamline the process of analyzing Ruby files for syntax issues.
- **Extendable Architecture**: Adapt the solution to fit various project requirements and coding standards.

### Core Components

#### SyntaxScanner Class

The `SyntaxScanner` class serves as the core of the analysis tool, responsible for traversing directories and applying detectors to identify code patterns.

```ruby
# lib/syntax_scanner.rb
require 'parser/current'
require 'colorize'

class SyntaxScanner
  attr_reader :directory, :results, :structure_detector

  def initialize(directory, structure_detector)
    @directory = directory
    @structure_detector = structure_detector
    @results = []
  end

  def scan
    log_message("Scanning directory: #{@directory}", :blue)
    ruby_files.each do |file|
      process_file(file)
    end
    output_results
  end

  private

  def ruby_files
    Dir.glob(File.join(@directory, '**', '*.rb'))
  end

  def process_file(file)
    content = File.read(file)
    ast = Parser::CurrentRuby.parse(content)
    find_syntax_structures(ast, file) if ast
  rescue => e
    log_message("Error processing file #{file}: #{e.message}", :red)
  end

  def find_syntax_structures(node, file)
    return unless node.is_a?(Parser::AST::Node)

    if @structure_detector.matches?(node)
      record_result(node, file)
    end

    node.children.each do |child|
      find_syntax_structures(child, file) if child.is_a?(Parser::AST::Node)
    end
  end

  def record_result(node, file)
    line_number = node.location.expression.line
    result = {
      file: file,
      line: line_number,
      code: node.location.expression.source_buffer.source_line(line_number).strip
    }
    @results << result
    log_message("Found matching syntax structure in #{file} at line #{line_number}:", :green)
    log_message(result[:code], :yellow)
  end

  def output_results
    log_message("\nSummary of Results:", :blue)
    if @results.empty?
      log_message("No occurrences of the specified syntax structure found.", :blue)
    else
      log_message("Found #{@results.size} occurrences of the specified syntax structure:", :blue)
      @results.each do |result|
        log_message("#{result[:file]}:#{result[:line]} - #{result[:code]}", :yellow)
      end
    end
  end

  def log_message(message, color)
    puts message.colorize(color)
  end
end
```

#### WhereNotSyntaxDetector

The `WhereNotSyntaxDetector` is an example of a detector designed to identify specific instances of `where.not` with multiple attributes.

```ruby
# lib/where_not_syntax_detector.rb
class WhereNotSyntaxDetector
  def matches?(node)
    return false unless node.type == :send

    receiver, method_name, *args = *node

    if method_name == :not && receiver.type == :send && receiver.children[1] == :where
      second_arg = node.children[2]
      return second_arg&.type == :hash && second_arg.children.size > 1
    end

    false
  end
end
```

### Usage Example

To use this framework, instantiate the `WhereNotSyntaxDetector` and pass it to the `SyntaxScanner`:

```ruby
# Usage example
detector = WhereNotSyntaxDetector.new
scanner = SyntaxScanner.new('app', detector)
scanner.scan
```

### Example Output

Here's an example of what the output might look like when running the scanner:

#### Scenario

- **Directory**: Scanning the `app` directory for specific syntax patterns.

#### Console Log Output

```plaintext
Scanning directory: app
Found matching syntax structure in app/models/user.rb at line 45:
where.not(first_name: nil, last_name: nil)

Summary of Results:
Found 1 occurrences of the specified syntax structure:
app/models/user.rb:45 - where.not(first_name: nil, last_name: nil)
```

### Extending the Framework

#### Creating a Custom Detector

To adapt this framework for other syntax patterns, implement a custom detector class:

```ruby
# lib/custom_syntax_detector.rb
class CustomSyntaxDetector
  def matches?(node)
    # Implement logic to match your specific syntax structure
    false
  end
end
```

#### Using a Custom Detector

Replace the existing detector with your custom implementation:

```ruby
# Usage example with custom detector
custom_detector = CustomSyntaxDetector.new
scanner = SyntaxScanner.new('app', custom_detector)
scanner.scan
```

### Conclusion

Automatic code analysis can significantly enhance the efficiency and reliability of maintaining and upgrading Ruby projects. By using the `SyntaxScanner` script as a starting point, developers can automate the detection of complex or deprecated syntax patterns, reducing the time and effort required for manual code reviews.

This script offers a valuable foundation for identifying potential issues in a codebase, allowing for customization and extension according to specific needs. I hope this tool inspires ideas for implementing similar solutions in various projects, ultimately improving code quality and streamlining the development process.

Feel free to experiment with and adapt the script to fit unique requirements, and I hope its insights prove beneficial. If there are any thoughts or improvements to share, I'd love to see them in the comments. Happy coding!
