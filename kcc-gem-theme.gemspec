# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "kcc-gem-theme"
  spec.version       = "3.10.0"

  spec.authors       = ["wdzajicek"]
  spec.email         = ["wdzajicek@gmail.com"]

  spec.summary       = "KCC's Gem-based theme for building jekyll sites."
  spec.homepage      = "https://github.com/KankakeeCommunityCollege/kcc-gem-theme"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_data|_includes|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4"

  spec.add_development_dependency "bundler", "~> 2"
  spec.add_development_dependency "rake", "~> 12.0"
end
