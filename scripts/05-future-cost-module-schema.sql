-- Future Cost Module Schema (Example of extensibility)

-- Cost Centers
CREATE TABLE cost_centers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    factory_id UUID REFERENCES factories(id),
    name VARCHAR(255) NOT NULL,
    cost_center_code VARCHAR(50),
    manager_id UUID REFERENCES operators(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cost Entries (extends data_entries)
CREATE TABLE cost_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_entry_id UUID REFERENCES data_entries(id),
    cost_center_id UUID REFERENCES cost_centers(id),
    cost_type VARCHAR(50), -- 'material', 'labor', 'overhead', 'energy'
    amount DECIMAL(12,2),
    currency VARCHAR(3) DEFAULT 'INR',
    allocation_basis VARCHAR(50), -- 'per_unit', 'per_hour', 'fixed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cost Allocations
CREATE TABLE cost_allocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cost_entry_id UUID REFERENCES cost_entries(id),
    machine_id UUID REFERENCES machines(id),
    product_id UUID REFERENCES products(id),
    allocated_amount DECIMAL(12,2),
    allocation_percentage DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
