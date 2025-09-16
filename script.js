// Trie Implementation for Fast Contact Search
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
        this.contacts = new Set();
    }
}

class ContactTrie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(contact) {
        // Insert name words
        const nameWords = contact.name.toLowerCase().split(' ');
        nameWords.forEach(word => {
            this.insertWord(word, contact);
        });

        // Insert phone number digits
        const phoneDigits = contact.phone.replace(/\D/g, '');
        this.insertWord(phoneDigits, contact);

        // Insert email if exists
        if (contact.email) {
            const emailParts = contact.email.toLowerCase().split('@');
            emailParts.forEach(part => {
                this.insertWord(part, contact);
            });
        }
    }

    insertWord(word, contact) {
        let node = this.root;
        
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
            node.contacts.add(contact);
        }
        
        node.isEndOfWord = true;
    }

    search(prefix) {
        if (!prefix.trim()) return [];
        
        const node = this.findNode(prefix.toLowerCase());
        if (!node) return [];

        return Array.from(node.contacts);
    }

    findNode(prefix) {
        let node = this.root;
        
        for (const char of prefix) {
            if (!node.children.has(char)) {
                return null;
            }
            node = node.children.get(char);
        }
        
        return node;
    }

    delete(contact) {
        // Remove from name words
        const nameWords = contact.name.toLowerCase().split(' ');
        nameWords.forEach(word => {
            this.deleteFromWord(word, contact);
        });

        // Remove from phone number
        const phoneDigits = contact.phone.replace(/\D/g, '');
        this.deleteFromWord(phoneDigits, contact);

        // Remove from email if exists
        if (contact.email) {
            const emailParts = contact.email.toLowerCase().split('@');
            emailParts.forEach(part => {
                this.deleteFromWord(part, contact);
            });
        }
    }

    deleteFromWord(word, contact) {
        const nodes = [];
        let node = this.root;
        
        // Collect all nodes in the path
        nodes.push(node);
        for (const char of word) {
            if (!node.children.has(char)) return;
            node = node.children.get(char);
            nodes.push(node);
        }

        // Remove contact from all nodes in the path
        nodes.forEach(n => n.contacts.delete(contact));
    }
}

// Default Contacts Data
const DEFAULT_CONTACTS = [
    // Family Contacts
    {
        id: 1,
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        email: "rajesh.kumar@gmail.com",
        tag: "family",
        favorite: true,
        createdAt: new Date("2024-01-15"),
        lastCalled: new Date("2024-06-20"),
    },
    {
        id: 2,
        name: "Priya Sharma",
        phone: "+91 87654 32109",
        email: "priya.sharma@yahoo.com",
        tag: "family",
        favorite: true,
        createdAt: new Date("2024-02-10"),
        lastCalled: new Date("2024-06-18"),
    },
    {
        id: 3,
        name: "Amit Singh",
        phone: "+91 76543 21098",
        email: "amit.singh@hotmail.com",
        tag: "family",
        favorite: false,
        createdAt: new Date("2024-03-05"),
    },
    {
        id: 4,
        name: "Sunita Devi",
        phone: "+91 65432 10987",
        email: "sunita.devi@gmail.com",
        tag: "family",
        favorite: true,
        createdAt: new Date("2024-03-20"),
        lastCalled: new Date("2024-06-15"),
    },
    {
        id: 5,
        name: "Vikram Gupta",
        phone: "+91 54321 09876",
        email: "vikram.gupta@outlook.com",
        tag: "family",
        favorite: false,
        createdAt: new Date("2024-04-01"),
    },
    
    // Work Contacts
    {
        id: 6,
        name: "Dr. Neha Agarwal",
        phone: "+91 98123 45670",
        email: "neha.agarwal@hospital.com",
        tag: "work",
        favorite: true,
        createdAt: new Date("2024-01-20"),
        lastCalled: new Date("2024-06-19"),
    },
    {
        id: 7,
        name: "Rohit Verma",
        phone: "+91 87012 34569",
        email: "rohit.verma@techcorp.in",
        tag: "work",
        favorite: false,
        createdAt: new Date("2024-02-15"),
    },
    {
        id: 8,
        name: "Anjali Patel",
        phone: "+91 76901 23458",
        email: "anjali.patel@company.co.in",
        tag: "work",
        favorite: true,
        createdAt: new Date("2024-03-10"),
        lastCalled: new Date("2024-06-17"),
    },
    {
        id: 9,
        name: "Suresh Reddy",
        phone: "+91 65890 12347",
        email: "suresh.reddy@business.com",
        tag: "work",
        favorite: false,
        createdAt: new Date("2024-03-25"),
    },
    {
        id: 10,
        name: "Kavita Joshi",
        phone: "+91 54789 01236",
        email: "kavita.joshi@startup.in",
        tag: "work",
        favorite: false,
        createdAt: new Date("2024-04-05"),
    },
    
    // Friends
    {
        id: 11,
        name: "Arjun Kapoor",
        phone: "+91 98234 56781",
        email: "arjun.kapoor@gmail.com",
        tag: "friends",
        favorite: true,
        createdAt: new Date("2024-01-10"),
        lastCalled: new Date("2024-06-21"),
    },
    {
        id: 12,
        name: "Sneha Kulkarni",
        phone: "+91 87123 45672",
        email: "sneha.kulkarni@yahoo.in",
        tag: "friends",
        favorite: true,
        createdAt: new Date("2024-02-05"),
        lastCalled: new Date("2024-06-16"),
    },
    {
        id: 13,
        name: "Ravi Mehta",
        phone: "+91 76012 34563",
        email: "ravi.mehta@hotmail.com",
        tag: "friends",
        favorite: false,
        createdAt: new Date("2024-02-20"),
    },
    {
        id: 14,
        name: "Pooja Nair",
        phone: "+91 65901 23454",
        email: "pooja.nair@gmail.com",
        tag: "friends",
        favorite: true,
        createdAt: new Date("2024-03-15"),
        lastCalled: new Date("2024-06-14"),
    },
    {
        id: 15,
        name: "Karan Thakur",
        phone: "+91 54890 12345",
        email: "karan.thakur@outlook.com",
        tag: "friends",
        favorite: false,
        createdAt: new Date("2024-04-10"),
    },
    
    // Other Contacts
    {
        id: 16,
        name: "Pizza Palace",
        phone: "+91 98000 12345",
        email: "orders@pizzapalace.in",
        tag: "other",
        favorite: false,
        createdAt: new Date("2024-02-28"),
    },
    {
        id: 17,
        name: "Cab Service",
        phone: "+91 87999 23456",
        email: "booking@cabservice.com",
        tag: "other",
        favorite: true,
        createdAt: new Date("2024-03-12"),
        lastCalled: new Date("2024-06-12"),
    },
    {
        id: 18,
        name: "Medical Store",
        phone: "+91 65777 45678",
        email: "info@medstore.com",
        tag: "other",
        favorite: false,
        createdAt: new Date("2024-04-08"),
    }
];

// Application State
class PhonebookApp {
    constructor() {
        this.contacts = [];
        this.callLogs = [];
        this.trie = new ContactTrie();
        this.currentFilter = 'all';
        this.sortBy = 'name';
        this.editingContact = null;
        this.callingContact = null;
        this.callTimer = null;
        this.callDuration = 0;
        this.isListening = false;
        this.recognition = null;

        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.setupVoiceSearch();
        this.renderContacts();
        this.updateStats();
        this.updateFilterCounts();
    }

    loadData() {
        // Load contacts from localStorage or use defaults
        const savedContacts = localStorage.getItem('phonebook-contacts');
        if (savedContacts) {
            this.contacts = JSON.parse(savedContacts);
        } else {
            this.contacts = DEFAULT_CONTACTS;
            this.saveContacts();
        }

        // Load call logs
        const savedCallLogs = localStorage.getItem('phonebook-call-logs');
        if (savedCallLogs) {
            this.callLogs = JSON.parse(savedCallLogs);
        }

        // Rebuild trie
        this.rebuildTrie();

        console.log(`Loaded ${this.contacts.length} contacts from storage`);
    }

    saveContacts() {
        localStorage.setItem('phonebook-contacts', JSON.stringify(this.contacts));
    }

    saveCallLogs() {
        localStorage.setItem('phonebook-call-logs', JSON.stringify(this.callLogs));
    }

    rebuildTrie() {
        this.trie = new ContactTrie();
        this.contacts.forEach(contact => this.trie.insert(contact));
    }

    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Voice search
        const voiceBtn = document.getElementById('voice-search-btn');
        voiceBtn.addEventListener('click', () => {
            this.toggleVoiceSearch();
        });

        // Filter tags
        const filterTags = document.querySelectorAll('.filter-tag');
        filterTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Sort button
        const sortBtn = document.getElementById('sort-btn');
        sortBtn.addEventListener('click', () => {
            this.toggleSort();
        });

        // Add contact buttons
        const addBtn = document.getElementById('add-contact-btn');
        const fabBtn = document.getElementById('fab-add');
        addBtn.addEventListener('click', () => this.openContactModal());
        fabBtn.addEventListener('click', () => this.openContactModal());

        // Modal controls
        const closeModal = document.getElementById('close-modal');
        const cancelBtn = document.getElementById('cancel-btn');
        const contactForm = document.getElementById('contact-form');
        
        closeModal.addEventListener('click', () => this.closeContactModal());
        cancelBtn.addEventListener('click', () => this.closeContactModal());
        contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));

        // Call modal controls
        const endCallBtn = document.getElementById('end-call-btn');
        const muteBtn = document.getElementById('mute-btn');
        const speakerBtn = document.getElementById('speaker-btn');
        
        endCallBtn.addEventListener('click', () => this.endCall());
        muteBtn.addEventListener('click', () => this.toggleMute());
        speakerBtn.addEventListener('click', () => this.toggleSpeaker());

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Import/Export
        const importBtn = document.getElementById('import-btn');
        const exportBtn = document.getElementById('export-btn');
        const importFile = document.getElementById('import-file');
        
        importBtn.addEventListener('click', () => importFile.click());
        exportBtn.addEventListener('click', () => this.exportContacts());
        importFile.addEventListener('change', (e) => this.importContacts(e));

        // Close modals on backdrop click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeContactModal();
                this.closeCallModal();
            }
        });
    }

    setupVoiceSearch() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
            this.recognition.maxAlternatives = 1;

            this.recognition.onstart = () => {
                this.isListening = true;
                this.updateVoiceUI();
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('search-input').value = transcript;
                this.handleSearch(transcript);
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.showToast('Voice search failed', 'Please try again', 'error');
                this.isListening = false;
                this.updateVoiceUI();
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateVoiceUI();
            };
        } else {
            // Hide voice search button if not supported
            document.getElementById('voice-search-btn').style.display = 'none';
        }
    }

    toggleVoiceSearch() {
        if (!this.recognition) return;

        if (this.isListening) {
            this.recognition.stop();
        } else {
            try {
                this.recognition.start();
            } catch (error) {
                console.error('Error starting speech recognition:', error);
                this.showToast('Voice search failed', 'Please try again', 'error');
            }
        }
    }

    updateVoiceUI() {
        const voiceBtn = document.getElementById('voice-search-btn');
        const voiceStatus = document.getElementById('voice-status');
        
        if (this.isListening) {
            voiceBtn.classList.add('listening');
            voiceStatus.classList.remove('hidden');
        } else {
            voiceBtn.classList.remove('listening');
            voiceStatus.classList.add('hidden');
        }
    }

    handleSearch(query) {
        const suggestions = document.getElementById('suggestions');
        
        if (query.trim()) {
            const results = this.trie.search(query);
            this.showSuggestions(results.slice(0, 5));
            this.renderContacts(results);
        } else {
            suggestions.classList.add('hidden');
            this.renderContacts();
        }
    }

    showSuggestions(contacts) {
        const suggestions = document.getElementById('suggestions');
        
        if (contacts.length === 0) {
            suggestions.classList.add('hidden');
            return;
        }

        suggestions.innerHTML = contacts.map(contact => `
            <div class="suggestion-item" data-contact-id="${contact.id}">
                <div class="avatar-circle" style="background: ${this.getAvatarColor(contact.name)}">
                    ${this.getInitials(contact.name)}
                </div>
                <div>
                    <div style="font-weight: 500;">${contact.name}</div>
                    <div style="font-size: 0.875rem; color: var(--text-secondary);">${contact.phone}</div>
                </div>
            </div>
        `).join('');

        // Add click handlers
        suggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const contactId = parseInt(e.currentTarget.dataset.contactId);
                const contact = this.contacts.find(c => c.id === contactId);
                if (contact) {
                    document.getElementById('search-input').value = contact.name;
                    this.renderContacts([contact]);
                    suggestions.classList.add('hidden');
                }
            });
        });

        suggestions.classList.remove('hidden');
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderContacts();
    }

    toggleSort() {
        this.sortBy = this.sortBy === 'name' ? 'recent' : 'name';
        
        const sortBtn = document.getElementById('sort-btn');
        const icon = sortBtn.querySelector('i');
        
        if (this.sortBy === 'name') {
            icon.className = 'fas fa-sort-alpha-down';
            sortBtn.title = 'Sort by Name';
        } else {
            icon.className = 'fas fa-clock';
            sortBtn.title = 'Sort by Recent';
        }
        
        this.renderContacts();
    }

    getFilteredContacts() {
        let filtered = [...this.contacts];

        // Apply tag filter
        if (this.currentFilter === 'favorites') {
            filtered = filtered.filter(contact => contact.favorite);
        } else if (this.currentFilter !== 'all') {
            filtered = filtered.filter(contact => contact.tag === this.currentFilter);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            if (this.sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else {
                // Sort by last called, with never called contacts at the end
                if (!a.lastCalled && !b.lastCalled) return a.name.localeCompare(b.name);
                if (!a.lastCalled) return 1;
                if (!b.lastCalled) return -1;
                const dateA = typeof a.lastCalled === 'string' ? new Date(a.lastCalled) : a.lastCalled;
                const dateB = typeof b.lastCalled === 'string' ? new Date(b.lastCalled) : b.lastCalled;
                return dateB.getTime() - dateA.getTime();
            }
        });

        return filtered;
    }

    renderContacts(contacts = null) {
        const contactsList = document.getElementById('contacts-list');
        const displayContacts = contacts || this.getFilteredContacts();

        if (displayContacts.length === 0) {
            contactsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-address-book"></i>
                    <h3>No contacts found</h3>
                    <p>Try adjusting your search or add a new contact</p>
                </div>
            `;
            return;
        }

        contactsList.innerHTML = displayContacts.map(contact => `
            <div class="contact-item slide-up" data-contact-id="${contact.id}">
                <div class="contact-info">
                    <div class="avatar-circle" style="background: ${this.getAvatarColor(contact.name)}">
                        ${this.getInitials(contact.name)}
                    </div>
                    <div class="contact-details">
                        <div class="contact-name">
                            ${contact.name}
                            ${contact.favorite ? '<i class="fas fa-star favorite-star"></i>' : ''}
                        </div>
                        <div class="contact-phone">${contact.phone}</div>
                        <div class="contact-meta">
                            <span class="tag-badge tag-${contact.tag}">${contact.tag}</span>
                            <span class="last-called">${this.getTimeAgo(contact.lastCalled)}</span>
                        </div>
                    </div>
                </div>
                <div class="contact-actions">
                    <button class="action-btn call" data-action="call" title="Call">
                        <i class="fas fa-phone"></i>
                    </button>
                    <button class="action-btn edit" data-action="edit" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn favorite ${contact.favorite ? 'active' : ''}" data-action="favorite" title="Toggle Favorite">
                        <i class="fas fa-star"></i>
                    </button>
                    <button class="action-btn delete" data-action="delete" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to action buttons
        contactsList.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const contactId = parseInt(e.target.closest('.contact-item').dataset.contactId);
                const contact = this.contacts.find(c => c.id === contactId);
                const action = e.target.closest('.action-btn').dataset.action;
                
                this.handleContactAction(contact, action);
            });
        });
    }

    handleContactAction(contact, action) {
        switch (action) {
            case 'call':
                this.startCall(contact);
                break;
            case 'edit':
                this.editContact(contact);
                break;
            case 'favorite':
                this.toggleFavorite(contact);
                break;
            case 'delete':
                this.deleteContact(contact);
                break;
        }
    }

    startCall(contact) {
        this.callingContact = contact;
        this.openCallModal();
        
        // Simulate call flow
        this.callDuration = 0;
        
        // Show calling state
        document.getElementById('call-state-calling').classList.remove('hidden');
        document.getElementById('call-state-connected').classList.add('hidden');
        document.getElementById('call-state-ended').classList.add('hidden');
        
        // Set contact info
        document.getElementById('call-name').textContent = contact.name;
        document.getElementById('call-phone').textContent = contact.phone;
        document.getElementById('call-initials').textContent = this.getInitials(contact.name);
        document.getElementById('call-avatar-circle').style.background = this.getAvatarColor(contact.name);
        
        // Simulate connection after 2-3 seconds
        setTimeout(() => {
            if (this.callingContact) {
                document.getElementById('call-state-calling').classList.add('hidden');
                document.getElementById('call-state-connected').classList.remove('hidden');
                
                // Start call timer
                this.callTimer = setInterval(() => {
                    this.callDuration++;
                    document.getElementById('call-duration').textContent = this.formatDuration(this.callDuration);
                }, 1000);
            }
        }, 2000 + Math.random() * 1000);
        
        // Auto-end call after 20 seconds for demo
        setTimeout(() => {
            if (this.callingContact) {
                this.endCall();
            }
        }, 20000);
    }

    endCall() {
        if (!this.callingContact) return;
        
        // Clear timer
        if (this.callTimer) {
            clearInterval(this.callTimer);
            this.callTimer = null;
        }
        
        // Show call ended state
        document.getElementById('call-state-calling').classList.add('hidden');
        document.getElementById('call-state-connected').classList.add('hidden');
        document.getElementById('call-state-ended').classList.remove('hidden');
        document.getElementById('call-controls').classList.add('hidden');
        document.getElementById('call-final-duration').textContent = `Duration: ${this.formatDuration(this.callDuration)}`;
        
        // Update contact's last called time
        const contactIndex = this.contacts.findIndex(c => c.id === this.callingContact.id);
        if (contactIndex !== -1) {
            this.contacts[contactIndex].lastCalled = new Date();
            this.saveContacts();
            this.rebuildTrie();
        }
        
        // Add call log
        this.callLogs.push({
            id: Date.now(),
            contactId: this.callingContact.id,
            duration: this.callDuration,
            timestamp: new Date(),
            type: 'outgoing'
        });
        this.saveCallLogs();
        
        this.showToast('Call ended', `Call with ${this.callingContact.name} lasted ${this.formatDuration(this.callDuration)}`, 'success');
        
        // Close modal after delay
        setTimeout(() => {
            this.closeCallModal();
        }, 2000);
    }

    toggleMute() {
        const muteBtn = document.getElementById('mute-btn');
        const icon = muteBtn.querySelector('i');
        
        muteBtn.classList.toggle('active');
        
        if (muteBtn.classList.contains('active')) {
            icon.className = 'fas fa-microphone-slash';
        } else {
            icon.className = 'fas fa-microphone';
        }
    }

    toggleSpeaker() {
        const speakerBtn = document.getElementById('speaker-btn');
        const icon = speakerBtn.querySelector('i');
        
        speakerBtn.classList.toggle('active');
        
        if (speakerBtn.classList.contains('active')) {
            icon.className = 'fas fa-volume-up';
        } else {
            icon.className = 'fas fa-volume-down';
        }
    }

    formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    editContact(contact) {
        this.editingContact = contact;
        this.openContactModal(contact);
    }

    toggleFavorite(contact) {
        const contactIndex = this.contacts.findIndex(c => c.id === contact.id);
        if (contactIndex !== -1) {
            this.contacts[contactIndex].favorite = !this.contacts[contactIndex].favorite;
            this.saveContacts();
            this.rebuildTrie();
            this.renderContacts();
            this.updateFilterCounts();
            
            const action = this.contacts[contactIndex].favorite ? 'Added to favorites' : 'Removed from favorites';
            this.showToast(action, `${contact.name} has been ${action.toLowerCase()}`, 'success');
        }
    }

    deleteContact(contact) {
        if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
            this.contacts = this.contacts.filter(c => c.id !== contact.id);
            this.trie.delete(contact);
            this.saveContacts();
            this.renderContacts();
            this.updateStats();
            this.updateFilterCounts();
            
            this.showToast('Contact deleted', `${contact.name} has been removed from your contacts`, 'success');
        }
    }

    openContactModal(contact = null) {
        const modal = document.getElementById('contact-modal');
        const title = document.getElementById('modal-title');
        const form = document.getElementById('contact-form');
        
        if (contact) {
            title.textContent = 'Edit Contact';
            form.name.value = contact.name;
            form.phone.value = contact.phone;
            form.email.value = contact.email || '';
            form.tag.value = contact.tag;
            this.editingContact = contact;
        } else {
            title.textContent = 'Add New Contact';
            form.reset();
            this.editingContact = null;
        }
        
        modal.classList.remove('hidden');
        modal.classList.add('visible');
        form.name.focus();
    }

    closeContactModal() {
        const modal = document.getElementById('contact-modal');
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 200);
        this.editingContact = null;
    }

    openCallModal() {
        const modal = document.getElementById('call-modal');
        document.getElementById('call-controls').classList.remove('hidden');
        
        // Reset mute and speaker buttons
        document.getElementById('mute-btn').classList.remove('active');
        document.getElementById('speaker-btn').classList.remove('active');
        document.getElementById('mute-btn').querySelector('i').className = 'fas fa-microphone';
        document.getElementById('speaker-btn').querySelector('i').className = 'fas fa-volume-up';
        
        modal.classList.remove('hidden');
        modal.classList.add('visible');
    }

    closeCallModal() {
        const modal = document.getElementById('call-modal');
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 200);
        
        // Reset call state
        if (this.callTimer) {
            clearInterval(this.callTimer);
            this.callTimer = null;
        }
        this.callingContact = null;
        this.callDuration = 0;
    }

    handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const contactData = {
            name: formData.get('name').trim(),
            phone: formData.get('phone').trim(),
            email: formData.get('email').trim(),
            tag: formData.get('tag'),
            favorite: false
        };
        
        if (!contactData.name || !contactData.phone) {
            this.showToast('Validation Error', 'Name and phone number are required', 'error');
            return;
        }
        
        if (this.editingContact) {
            // Update existing contact
            const contactIndex = this.contacts.findIndex(c => c.id === this.editingContact.id);
            if (contactIndex !== -1) {
                this.contacts[contactIndex] = {
                    ...this.contacts[contactIndex],
                    ...contactData
                };
                this.showToast('Contact updated', `${contactData.name} has been updated successfully`, 'success');
            }
        } else {
            // Add new contact
            const newContact = {
                ...contactData,
                id: Date.now(),
                createdAt: new Date()
            };
            this.contacts.push(newContact);
            this.showToast('Contact added', `${contactData.name} has been added to your contacts`, 'success');
        }
        
        this.saveContacts();
        this.rebuildTrie();
        this.renderContacts();
        this.updateStats();
        this.updateFilterCounts();
        this.closeContactModal();
    }

    exportContacts() {
        const dataStr = JSON.stringify(this.contacts, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `contacts_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        this.showToast('Contacts exported', 'Your contacts have been exported successfully', 'success');
    }

    importContacts(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedContacts = JSON.parse(e.target.result);
                const existingIds = new Set(this.contacts.map(c => c.id));
                const newContacts = importedContacts.filter(c => !existingIds.has(c.id));
                
                this.contacts = [...this.contacts, ...newContacts];
                this.saveContacts();
                this.rebuildTrie();
                this.renderContacts();
                this.updateStats();
                this.updateFilterCounts();
                
                this.showToast('Contacts imported', `${newContacts.length} new contacts have been imported`, 'success');
            } catch (error) {
                this.showToast('Import failed', 'Failed to import contacts. Please check the file format.', 'error');
            }
        };
        reader.onerror = () => {
            this.showToast('Import failed', 'Failed to read the file', 'error');
        };
        reader.readAsText(file);
        
        // Reset file input
        e.target.value = '';
    }

    toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('#theme-toggle i');
        
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('phonebook-theme', 'dark');
        } else {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('phonebook-theme', 'light');
        }
    }

    updateStats() {
        const totalContacts = this.contacts.length;
        const recentCalls = this.contacts.filter(c => c.lastCalled).length;
        
        document.getElementById('total-contacts').textContent = totalContacts;
        document.getElementById('recent-calls').textContent = recentCalls;
    }

    updateFilterCounts() {
        const counts = {
            all: this.contacts.length,
            favorites: this.contacts.filter(c => c.favorite).length,
            family: this.contacts.filter(c => c.tag === 'family').length,
            work: this.contacts.filter(c => c.tag === 'work').length,
            friends: this.contacts.filter(c => c.tag === 'friends').length,
            other: this.contacts.filter(c => c.tag === 'other').length
        };
        
        Object.keys(counts).forEach(tag => {
            const countElement = document.getElementById(`count-${tag}`);
            if (countElement) {
                countElement.textContent = counts[tag];
            }
        });
    }

    showToast(title, message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle'
        };
        
        toast.innerHTML = `
            <div class="toast-content">
                <i class="toast-icon ${icons[type]}"></i>
                <div class="toast-text">
                    <div class="toast-title">${title}</div>
                    <div class="toast-message">${message}</div>
                </div>
            </div>
        `;
        
        container.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('visible');
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }

    getInitials(name) {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    getAvatarColor(name) {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        ];
        
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        return colors[Math.abs(hash) % colors.length];
    }

    getTimeAgo(date) {
        if (!date) return "Never called";
        
        const now = new Date();
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const diffInMinutes = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60));
        
        if (diffInMinutes < 60) {
            return `${diffInMinutes} minutes ago`;
        } else if (diffInMinutes < 1440) {
            const hours = Math.floor(diffInMinutes / 60);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(diffInMinutes / 1440);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('phonebook-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('#theme-toggle i').className = 'fas fa-sun';
    }
    
    // Initialize the app
    window.phonebookApp = new PhonebookApp();
});
