# Variables
JEKYLL = bundle exec jekyll
SOURCE = docs
CONFIG = _config.yml,_config.dev.yml

# Targets
.PHONY: serve build clean

serve:
	cd $(SOURCE) && $(JEKYLL) serve --config $(CONFIG)

build:
	cd $(SOURCE) && $(JEKYLL) build --config $(CONFIG)

clean:
	rm -rf $(SOURCE)/_site