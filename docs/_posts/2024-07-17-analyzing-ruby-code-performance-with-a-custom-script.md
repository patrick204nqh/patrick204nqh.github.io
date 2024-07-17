---
title: "Analyzing Ruby Code Performance with a Custom Script"
date: 2024-07-17
categories:
  - blog
tags:
  - ruby on rails
  - performance
toc: true
---

As a software developer, understanding and improving the performance of your code is crucial. In this post, I'll guide you through creating a performance analysis tool for Ruby code blocks, encapsulated within a class for easy use in the Rails console. This tool benchmarks code execution time and memory usage, displaying the results in a beautifully formatted CLI table.

---

### Why Use a Custom Performance Analysis Script?

1. **Feature Development and Optimization**:
   - When developing a new feature or optimizing old code, it’s essential to understand how these changes affect the performance of your functions.
   
2. **Better Formatting and Clarity**:
   - The default output from benchmarking tools like `Benchmark` can be quite plain and sometimes unclear. Often, you may need to format this data manually to explain it to others or to interpret it correctly. A custom script can present important metrics in a clear, formatted table, making it easier to parse and share with reviewers quickly.

---

### Installation

To use this performance analysis script, you'll need to install the following gems:

```sh
gem install benchmark terminal-table get_process_mem
```

---

### Creating the Performance Analyzer Class

Save the following script as `lib/scripts/performance_analyzer.rb`:

```ruby
require 'benchmark'
require 'terminal-table'
require 'get_process_mem'

class PerformanceAnalyzer
  def initialize(description: 'Block')
    @description = description
  end

  def analyze(&block)
    raise ArgumentError, 'No block given' unless block_given?

    memory_before = GetProcessMem.new.mb
    result = Benchmark.measure do
      block.call
    end
    memory_after = GetProcessMem.new.mb
    memory_used = memory_after - memory_before

    rows = []
    rows << ['Description', @description]
    rows << :separator
    rows << ['Total Time (s)', format('%.6f', result.real)]
    rows << ['User CPU Time (s)', format('%.6f', result.utime)]
    rows << ['System CPU Time (s)', format('%.6f', result.stime)]
    rows << ['User + System CPU Time (s)', format('%.6f', result.total)]
    rows << :separator
    rows << ['Memory Before (MB)', format('%.2f', memory_before)]
    rows << ['Memory After (MB)', format('%.2f', memory_after)]
    rows << ['Memory Used (MB)', format('%.2f', memory_used)]

    table = Terminal::Table.new(
      title: 'Performance Analysis',
      headings: ['Metric', 'Value'],
      rows: rows,
      style: { border_x: "=", border_i: "x" }
    )

    puts table
  end
end
```

---

### Usage in Rails Console

1. **Load the Script**:
   Ensure your Rails console can load the script. You might need to adjust the load path or use `require_relative` if the script is not in the default load path.

2. **Use the Class**:
   You can use the `PerformanceAnalyzer` class directly in the Rails console. Here’s how:

```ruby
# Start Rails console
rails console

# Load the script (if not already loaded by Rails autoloading)
load 'lib/scripts/performance_analyzer.rb'

# Create an instance of the PerformanceAnalyzer
analyzer = PerformanceAnalyzer.new(description: 'Example Description')

# Analyze a block of code
analyzer.analyze do
  # Your code to analyze
  sum = 0
  1_000_000.times do |i|
    sum += i
  end
  sum
end
```

---

### Sample Output

```
x============================x=====================x
|               Performance Analysis               |
x============================x=====================x
| Metric                     | Value               |
x============================x=====================x
| Description                | Example Description |
x============================x=====================x
| Total Time (s)             | 0.058283            |
| User CPU Time (s)          | 0.058898            |
| System CPU Time (s)        | 0.000000            |
| User + System CPU Time (s) | 0.058898            |
x============================x=====================x
| Memory Before (MB)         | 216.27              |
| Memory After (MB)          | 216.39              |
| Memory Used (MB)           | 0.12                |
x============================x=====================x
```

---

### Customization

- **Different Blocks**:
  Pass any block of code to the `analyze` method with a description to measure its performance.
- **Additional Metrics**:
  Add more metrics or information to the table as needed.
- **Custom Headers**:
  Modify the headers to suit your needs.

---

### Reference Other Performance Analyzing Tools

While building your custom script, you can also draw inspiration from existing tools to enhance its functionality:

- [ruby-prof](https://github.com/ruby-prof/ruby-prof?tab=readme-ov-file): A fast code profiler for Ruby.
- [Datadog Continuous Profiler](https://www.datadoghq.com/blog/ruby-profiling-datadog-continuous-profiler/): A comprehensive tool for continuous profiling of Ruby applications.

---

### Final Thoughts

Using a performance analyzer like this can help you identify bottlenecks in your Ruby code, ensuring that your applications run efficiently. Customize and expand upon this basic structure to fit your specific needs, and always strive for optimized and well-performing code.

Happy coding!
